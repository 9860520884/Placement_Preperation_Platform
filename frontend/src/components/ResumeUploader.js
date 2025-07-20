// src/components/ResumeUploader.js
import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

export default function ResumeUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    // 1. Upload to Firebase Storage
    const storageRef = ref(storage, `resumes/${file.name}`);
    await uploadBytes(storageRef, file);

    // 2. Get public URL
    const downloadUrl = await getDownloadURL(storageRef);

    // 3. Save URL to MongoDB
    await axios.post('YOUR_BACKEND_API/resumes', {
      userId: 'current-user-id', // Replace with actual user ID
      resumeUrl: downloadUrl
    });

    alert('Resume uploaded successfully!');
  };

  return (
    <div className="upload-section">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.docx"
      />
      <button onClick={handleUpload} className="upload-btn">
        Upload Resume
      </button>
    </div>
  );
}