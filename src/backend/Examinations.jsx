// src/backend/Examinations.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentDashboard.css";

// Universal API_BASE - Dev + Prod
const getApiBase = () => {
  if (import.meta.env.DEV) return "http://localhost:5000";
  return "https://irah.onrender.com";
};
const API_BASE = getApiBase();

// helper: better errors
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, { ...options, credentials: "include" });
  const text = await res.text();

  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || `${res.status} ${res.statusText}`
    );
  }
  return data;
}

const Examinations = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const teacher = location.state?.teacher || null;
  const student = location.state?.student || null;

  const mode = useMemo(() => {
    if (teacher?.email) return "teacher";
    if (student?.rollNo) return "student";
    return "none";
  }, [teacher, student]);

  // Shared
  const [statusMsg, setStatusMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Teacher editor state (create/update/upload)
  const [tStudentRollNo, setTStudentRollNo] = useState("");
  const [tExamName, setTExamName] = useState("");
  const [folder, setFolder] = useState(null);

  const [subjectName, setSubjectName] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [maxMarks, setMaxMarks] = useState("100");

  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [scriptFiles, setScriptFiles] = useState([]);

  // Teacher hierarchy state (persisted list from DB)
  const [tFolders, setTFolders] = useState([]);
  const [tLoading, setTLoading] = useState(false);
  const [tSelectedExam, setTSelectedExam] = useState("");
  const [tSelectedRoll, setTSelectedRoll] = useState("");

  // Student state
  const [sFolders, setSFolders] = useState([]);
  const [sSelectedFolder, setSSelectedFolder] = useState(null);
  const [sLoading, setSLoading] = useState(false);

  const goBack = () => {
    if (teacher) navigate("/teacher-dashboard", { state: { teacher } });
    else if (student) navigate("/student-dashboard", { state: { student } });
    else navigate("/");
  };

  // -------------------------
  // Teacher: fetch saved folders (mentor uploads only)
  // -------------------------
  const fetchTeacherFolders = async () => {
    if (!teacher?.email) return;
    setTLoading(true);
    try {
      const data = await fetchJSON(
        `${API_BASE}/api/exams/teacher/folders?mentorTeacherEmail=${encodeURIComponent(
          teacher.email
        )}`
      );
      setTFolders(Array.isArray(data.folders) ? data.folders : []);
    } catch (e) {
      setErrMsg(e.message || "Failed to load teacher folders");
    } finally {
      setTLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "teacher") {
      fetchTeacherFolders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, teacher?.email]);

  // Build hierarchy: examName -> rollNo -> folder
  const teacherTree = useMemo(() => {
    const tree = {};
    (tFolders || []).forEach((f) => {
      const exam = String(f.examName || "Unknown Exam");
      const roll = String(f.studentRollNo || "Unknown Roll");
      if (!tree[exam]) tree[exam] = {};
      tree[exam][roll] = f;
    });
    return tree;
  }, [tFolders]);

  // -------------------------
  // Student: load folders (by rollNo)
  // -------------------------
  useEffect(() => {
    const loadStudentFolders = async () => {
      if (mode !== "student") return;

      setErrMsg("");
      setStatusMsg("");
      setSLoading(true);

      try {
        const data = await fetchJSON(
          `${API_BASE}/api/exams/student/folders?rollNo=${encodeURIComponent(
            student.rollNo
          )}`
        );
        setSFolders(Array.isArray(data.folders) ? data.folders : []);
      } catch (e) {
        setErrMsg(e.message || "Failed to load exams");
      } finally {
        setSLoading(false);
      }
    };

    loadStudentFolders();
  }, [mode, student?.rollNo]);

  // -------------------------
  // Teacher actions
  // -------------------------
  const handleCreateFolder = async () => {
    setErrMsg("");
    setStatusMsg("");

    if (!tStudentRollNo.trim())
      return setErrMsg("Please enter student roll number");
    if (!tExamName.trim()) return setErrMsg("Please enter examination name");

    try {
      const data = await fetchJSON(`${API_BASE}/api/exams/teacher/create-folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentRollNo: tStudentRollNo.trim(),
          mentorTeacherEmail: teacher.email,
          examName: tExamName.trim(),
        }),
      });

      setFolder(data.folder);
      setSelectedSubjectId("");
      setStatusMsg("Folder created/loaded successfully ✅");

      // refresh hierarchy list so it persists
      fetchTeacherFolders();
    } catch (e) {
      setErrMsg(e.message || "Failed to create folder");
    }
  };

  const handleUpsertSubject = async () => {
    setErrMsg("");
    setStatusMsg("");

    if (!folder?._id) return setErrMsg("Create/select an exam folder first");
    if (!subjectName.trim()) return setErrMsg("Enter subject name");
    if (marksObtained === "" || marksObtained === null)
      return setErrMsg("Enter marks obtained");

    try {
      const data = await fetchJSON(
        `${API_BASE}/api/exams/teacher/${folder._id}/upsert-subject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subjectName: subjectName.trim(),
            marksObtained: Number(marksObtained),
            maxMarks: Number(maxMarks || 100),
          }),
        }
      );

      setFolder(data.folder);
      setSubjectName("");
      setMarksObtained("");
      setMaxMarks("100");
      setStatusMsg("Subject saved ✅");

      fetchTeacherFolders();
    } catch (e) {
      setErrMsg(e.message || "Failed to save subject");
    }
  };

  const handleUploadScripts = async () => {
    setErrMsg("");
    setStatusMsg("");

    if (!folder?._id) return setErrMsg("Create/select an exam folder first");
    if (!selectedSubjectId) return setErrMsg("Select a subject to upload scripts");
    if (!scriptFiles || scriptFiles.length === 0)
      return setErrMsg("Choose at least one script file");

    try {
      const fd = new FormData();
      Array.from(scriptFiles).forEach((f) => fd.append("scripts", f));

      await fetchJSON(
        `${API_BASE}/api/exams/teacher/${folder._id}/${selectedSubjectId}/upload-scripts`,
        { method: "POST", body: fd }
      );

      setStatusMsg("Scripts uploaded ✅");
      setScriptFiles([]);

      fetchTeacherFolders();
    } catch (e) {
      setErrMsg(e.message || "Failed to upload scripts");
    }
  };

  // Teacher: click hierarchy to load into editor
  const handleTeacherPickFolder = (examName, rollNo) => {
    const f = teacherTree?.[examName]?.[rollNo] || null;
    setFolder(f);

    setTSelectedExam(examName);
    setTSelectedRoll(rollNo);

    // also preload top inputs for convenience
    setTExamName(f?.examName || examName);
    setTStudentRollNo(f?.studentRollNo || rollNo);

    setSelectedSubjectId("");
    setStatusMsg("Loaded saved folder ✅");
    setErrMsg("");
  };

  // Student: open folder detail
  const handleStudentOpenFolder = async (folderId) => {
    setErrMsg("");
    setStatusMsg("");
    setSLoading(true);

    try {
      const data = await fetchJSON(
        `${API_BASE}/api/exams/student/folders/${folderId}?rollNo=${encodeURIComponent(
          student.rollNo
        )}`
      );
      setSSelectedFolder(data.folder);
    } catch (e) {
      setErrMsg(e.message || "Failed to load folder");
    } finally {
      setSLoading(false);
    }
  };

  if (mode === "none") {
    return (
      <div className="student-dashboard-page">
        <div className="student-dashboard-container">
          <div className="student-dashboard-card">
            <div className="student-dashboard-header">
              <div className="student-dashboard-title-block">
                <h1>Session expired</h1>
                <p>Please login again to access examinations.</p>
              </div>
              <div className="student-dashboard-actions">
                <button
                  className="student-dashboard-primary-btn"
                  onClick={() => navigate("/student-login")}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <div className="student-dashboard-card">
          <div className="student-dashboard-header">
            <div className="student-dashboard-title-block">
              <h1>Examinations</h1>
              <p>
                {mode === "teacher"
                  ? `Teacher: ${teacher.email}`
                  : `Student: ${student.rollNo} (${student.email})`}
              </p>
              <p style={{ marginTop: 6, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                API_BASE: {API_BASE}
              </p>
            </div>

            <div className="student-dashboard-actions">
              <button className="student-dashboard-primary-btn" onClick={goBack}>
                Back
              </button>
              <button className="student-dashboard-ghost-btn" onClick={() => navigate("/")}>
                Home
              </button>
            </div>
          </div>

          {errMsg ? (
            <div
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "0.75rem",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "var(--radius-md)",
                color: "#ef4444",
                fontSize: "0.9rem",
              }}
            >
              {errMsg}
            </div>
          ) : null}

          {statusMsg ? (
            <div
              style={{
                padding: "0.75rem 1rem",
                marginBottom: "0.75rem",
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                borderRadius: "var(--radius-md)",
                color: "#22c55e",
                fontSize: "0.9rem",
              }}
            >
              {statusMsg}
            </div>
          ) : null}

          {/* ---------------- TEACHER VIEW ---------------- */}
          {mode === "teacher" ? (
            <>
              {/* Hierarchical view */}
              <div className="student-info-card" style={{ marginTop: "0.5rem" }}>
                <div className="student-info-label">
                  Saved uploads (Exam → Roll No → Subjects → Marks)
                </div>

                {tLoading ? (
                  <div style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>
                    Loading...
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                      <select
                        className="student-profile-input"
                        value={tSelectedExam}
                        onChange={(e) => {
                          setTSelectedExam(e.target.value);
                          setTSelectedRoll("");
                          setFolder(null);
                        }}
                        style={{ minWidth: 220 }}
                      >
                        <option value="">Select exam...</option>
                        {Object.keys(teacherTree).map((exam) => (
                          <option key={exam} value={exam}>
                            {exam}
                          </option>
                        ))}
                      </select>

                      <select
                        className="student-profile-input"
                        value={tSelectedRoll}
                        onChange={(e) => {
                          const roll = e.target.value;
                          setTSelectedRoll(roll);
                          if (tSelectedExam && roll) handleTeacherPickFolder(tSelectedExam, roll);
                        }}
                        disabled={!tSelectedExam}
                        style={{ minWidth: 220 }}
                      >
                        <option value="">Select student roll no...</option>
                        {tSelectedExam
                          ? Object.keys(teacherTree[tSelectedExam] || {}).map((roll) => (
                              <option key={roll} value={roll}>
                                {roll}
                              </option>
                            ))
                          : null}
                      </select>

                      <button
                        className="student-dashboard-ghost-btn"
                        type="button"
                        onClick={fetchTeacherFolders}
                      >
                        Refresh
                      </button>
                    </div>

                    {folder?.subjects?.length ? (
                      <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {folder.subjects.map((s) => (
                          <div key={s._id} style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>
                            {s.subjectName} — {s.marksObtained}/{s.maxMarks}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* Teacher editor (create/open folder) */}
              <div className="student-dashboard-grid" style={{ marginTop: "1rem" }}>
                <div className="student-info-card">
                  <div className="student-info-label">Student Roll No</div>
                  <input
                    className="student-profile-input"
                    value={tStudentRollNo}
                    onChange={(e) => setTStudentRollNo(e.target.value)}
                    placeholder="e.g. 21CS001"
                  />
                </div>

                <div className="student-info-card">
                  <div className="student-info-label">Exam Name</div>
                  <input
                    className="student-profile-input"
                    value={tExamName}
                    onChange={(e) => setTExamName(e.target.value)}
                    placeholder="e.g. Mid-1"
                  />
                </div>

                <div className="student-info-card" style={{ display: "flex", alignItems: "flex-end" }}>
                  <button className="student-dashboard-primary-btn" onClick={handleCreateFolder}>
                    Create / Open Folder
                  </button>
                </div>
              </div>

              {folder ? (
                <div style={{ marginTop: "1rem" }}>
                  <div className="student-info-card" style={{ marginBottom: "1rem" }}>
                    <div className="student-info-label">Current Folder</div>
                    <div className="student-info-value">
                      {folder.examName} - {folder.studentRollNo}
                    </div>
                  </div>

                  {/* Add / Update Subject */}
                  <div className="student-info-card" style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      <div style={{ minWidth: 220 }}>
                        <div className="student-info-label">Subject</div>
                        <input
                          className="student-profile-input"
                          value={subjectName}
                          onChange={(e) => setSubjectName(e.target.value)}
                          placeholder="e.g. DSA"
                        />
                      </div>

                      <div style={{ minWidth: 160 }}>
                        <div className="student-info-label">Marks Obtained</div>
                        <input
                          className="student-profile-input"
                          type="number"
                          value={marksObtained}
                          onChange={(e) => setMarksObtained(e.target.value)}
                          placeholder="e.g. 24"
                        />
                      </div>

                      <div style={{ minWidth: 160 }}>
                        <div className="student-info-label">Max Marks</div>
                        <input
                          className="student-profile-input"
                          type="number"
                          value={maxMarks}
                          onChange={(e) => setMaxMarks(e.target.value)}
                          placeholder="100"
                        />
                      </div>

                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <button className="student-dashboard-primary-btn" onClick={handleUpsertSubject}>
                          Save Subject
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subjects list + pick one for upload */}
                  <div className="student-info-card" style={{ marginBottom: "1rem" }}>
                    <div className="student-info-label">Subjects</div>
                    {Array.isArray(folder.subjects) && folder.subjects.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                        {folder.subjects.map((s) => (
                          <button
                            key={s._id}
                            type="button"
                            className="student-dashboard-ghost-btn"
                            style={{
                              textAlign: "left",
                              borderColor: selectedSubjectId === s._id ? "rgba(129, 178, 241, 0.9)" : undefined,
                            }}
                            onClick={() => setSelectedSubjectId(s._id)}
                          >
                            {s.subjectName} — {s.marksObtained}/{s.maxMarks}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>No subjects yet.</div>
                    )}
                  </div>

                  {/* Upload scripts */}
                  <div className="student-info-card">
                    <div className="student-info-label">Upload Answer Scripts</div>

                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setScriptFiles(e.target.files)}
                        style={{ color: "var(--text-primary)" }}
                      />

                      <button className="student-dashboard-primary-btn" onClick={handleUploadScripts}>
                        Upload
                      </button>
                    </div>

                    <div style={{ marginTop: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Select a subject above, then upload scripts (PDF/images).
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {/* ---------------- STUDENT VIEW ---------------- */}
          {mode === "student" ? (
            <div style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)", gap: "1rem" }}>
              <div className="student-info-card">
                <div className="student-info-label">Your Exam Folders</div>

                {sLoading ? (
                  <div style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>Loading...</div>
                ) : sFolders.length === 0 ? (
                  <div style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>
                    No exams uploaded yet.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
                    {sFolders.map((f) => (
                      <button
                        key={f._id}
                        type="button"
                        className="student-dashboard-ghost-btn"
                        style={{ textAlign: "left" }}
                        onClick={() => handleStudentOpenFolder(f._id)}
                      >
                        {f.examName}{" "}
                        <span style={{ color: "var(--text-muted)" }}>
                          ({new Date(f.createdAt).toLocaleDateString()})
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="student-info-card">
                <div className="student-info-label">Folder Details</div>

                {!sSelectedFolder ? (
                  <div style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>
                    Select an exam folder to view marks and scripts.
                  </div>
                ) : (
                  <div style={{ marginTop: "0.75rem" }}>
                    <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>
                      {sSelectedFolder.examName}
                    </div>

                    {Array.isArray(sSelectedFolder.subjects) && sSelectedFolder.subjects.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {sSelectedFolder.subjects.map((sub) => (
                          <div
                            key={sub._id}
                            style={{
                              padding: "0.75rem",
                              borderRadius: "12px",
                              border: "1px solid rgba(255,255,255,0.08)",
                              background: "rgba(5, 8, 25, 0.45)",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                              <div style={{ fontWeight: 700 }}>{sub.subjectName}</div>
                              <div style={{ color: "var(--text-muted)" }}>
                                Marks:{" "}
                                <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                                  {sub.marksObtained}
                                </span>
                                /{sub.maxMarks}
                              </div>
                            </div>

                            <div style={{ marginTop: "0.5rem" }}>
                              <div className="student-info-label" style={{ marginBottom: "0.25rem" }}>
                                Answer Scripts
                              </div>

                              {Array.isArray(sub.scripts) && sub.scripts.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                                  {sub.scripts.map((sc, i) => (
                                    <a
                                      key={`${sub._id}-${i}`}
                                      href={sc.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{ color: "var(--accent)", textDecoration: "underline", fontSize: "0.9rem" }}
                                    >
                                      {sc.originalName || `Script ${i + 1}`}
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                  No scripts uploaded.
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ marginTop: "0.75rem", color: "var(--text-muted)" }}>
                        No subjects found in this exam.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Examinations;
