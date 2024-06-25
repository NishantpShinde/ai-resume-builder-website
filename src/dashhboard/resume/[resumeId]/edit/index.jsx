import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FormSection from "../../Components/FormSection";
import ResumePreview from "../../Components/ResumePreview";
import dummy from "@/data/dummy";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from './../../../../../services/GlobalApi';

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then(resp=>{
      setResumeInfo(resp.data.data.attributes);
    })
}

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
