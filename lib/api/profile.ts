import { uploadRequest } from "./client";

export type UploadedResume = {
  fileName: string;
  storedName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  importSource: string;
};

const ProfileAPI = {
  uploadResume: async (
    file: File
  ): Promise<{ resume: UploadedResume } | null> => {
    const formData = new FormData();
    formData.append("resume", file);
    return await uploadRequest("/profile/resume", formData);
  },
};

export default ProfileAPI;
