/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles/style.css";
import generalFields from "./utils/GeneralSectionFields";
import educationFields from "./utils/EducationSectionFields";
import experienceFields from "./utils/ExperienceSectionFields";
import GeneralSection from "./components/General";
import EducationSection from "./components/Education";
import ExperienceSection from "./components/Experience";

let educationId = 0;
let experienceId = 0;
let isEducationAdded = false;
let isExperienceAdded = false;
function App() {
const [fields, setGeneralFields] = useState(generalFields);
  const [fieldsForEducation, setEducationFields] = useState(educationFields);
  const [fieldsForExperience, setExperienceFields] = useState(experienceFields);
  let [addEducationSection, setEducationSection] = useState([]);
  let [addExperienceSection, setExperienceSection] = useState([]);

  function isDataAvailable(array) {
    const isData = array
      .filter((el) => el.name !== "End Date")
      .every((el) => el.value !== "");
    return isData;
  }

  function fetchValues(array) {
    const values = array.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {});
    return values;
  }

  const educationValues = fetchValues(fieldsForEducation);
  const experienceValues = fetchValues(fieldsForExperience);
  function handleAddEducationSection(event) {
    event.preventDefault();

    const educationData = isDataAvailable(fieldsForEducation);
    const institution = educationValues["Institution"];
    const course = educationValues["Course"];
    const title = educationValues["Title"];
    const startDate = educationValues["Start Date"];
    const endDate = educationValues["End Date"];

    const arr = [
      ...addEducationSection,
      {
        Id: educationId++,
        Institution: institution,
        Course: course,
        Title: title,
        StartDate: startDate,
        EndDate: endDate,
      },
    ];
    if (educationData) {
      setEducationSection(arr);
      isEducationAdded = true;
    }
  }
  function handleAddExperienceSection(event) {
    event.preventDefault();
    const experienceData = isDataAvailable(fieldsForExperience);
    const company = experienceValues["Company"];
    const position = experienceValues["Position"];
    const description = experienceValues["Description"];
    const startDate = experienceValues["Start Date"];
    const endDate = experienceValues["End Date"];
  
    const arr = [
      ...addExperienceSection,
      {
        Id: experienceId++,
        Company: company,
        Position: position,
        Description: description,
        StartDate: startDate,
        EndDate: endDate,
      },
    ];
    if (experienceData) {
      setExperienceSection(arr);
      isExperienceAdded = true;
    }
   
  }

  function handleDeleteEducationSection(Id) {
    const newArr = addEducationSection.filter(
      (element) => element.Id !== Number(Id)
    );
    setEducationSection(newArr);
    if(newArr.length===0){
      isEducationAdded = false;
    }
  }

  function handleDeleteExperienceSection(Id) {
    const newArr = addExperienceSection.filter(
      (element) => element.Id !== Number(Id)
    );
    setExperienceSection(newArr);
    if(newArr.length===0){
      isExperienceAdded = false;
    }
  }
  function handleFieldChange(name, value) {
    setGeneralFields(
      fields.map((field) => {
        if (field.name === name) {
          return { ...field, value: value };
        } else {
          return field;
        }
      })
    );
  }
  function handleEducationFieldChange(name, value) {
    setEducationFields(
      fieldsForEducation.map((field) => {
        if (field.name === name) {
          return { ...field, value: value };
        } else {
          return field;
        }
      })
    );
  }
  function handleExperienceFieldChange(name, value) {
    setExperienceFields(
      fieldsForExperience.map((field) => {
        if (field.name === name) {
          return { ...field, value: value };
        } else {
          return field;
        }
      })
    );
  }
  return (
    <>
      <header>
        <h1>CV Application</h1>
       </header>
      <div className="main-container">
        <section className="input-section">
          <GeneralSection
            fields={fields}
            onChange={handleFieldChange}
          ></GeneralSection>
          <EducationSection
            fields={fieldsForEducation}
            onchange={handleEducationFieldChange}
            onclick={handleAddEducationSection}
            add={addEducationSection}
            onDelete={handleDeleteEducationSection}
          />
          <ExperienceSection
            fields={fieldsForExperience}
            onchange={handleExperienceFieldChange}
            onclick={handleAddExperienceSection}
            add={addExperienceSection}
            onDelete={handleDeleteExperienceSection}
          />
        </section>
        <section className="resume-section" id="resume">
          <div className="general-information">
            <GeneralSectionResume fields={fields} />
          </div>

          <div className="education-information">
            {isEducationAdded ? (<div><h4>Education</h4>
             <hr className="resume-line"/></div>) : ''}
            {addEducationSection.map((element) => (
              <div key={element.Id}>
                <EducationSectionResume
                  institution={element.Institution}
                  course={element.Course}
                  title={element.title}
                  startDate={element.StartDate}
                  endDate={element.EndDate}
                />
                </div>
            ))}
          </div>
          <div className="experience-information">
          {isExperienceAdded ? (<div><h4>Experience</h4>
            <hr className="resume-line"/></div>) : ''}
            {addExperienceSection.map((element) => (
              <div key={element.Id}>
                <ExperienceSectionResume
                  company={element.Company}
                  position={element.Position}
                  description={element.Description}
                  startDate={element.StartDate}
                  endDate={element.EndDate}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
function GeneralSectionResume({ fields }) {
  const [
    firstName,
    lastName,
    Title,
    Email,
    Phone,
    Github,
    Linkedin,
  ] = [...fields];

  let fullName = firstName.value + ' ' +  lastName.value;
  let title = Title.value;
  let email = Email.value;
  let phone = Phone.value;
  let githubLink = Github.value;
  let linkedinLink = Linkedin.value;
  return (
    <>
      <div>
        <p className="fullName">{fullName}</p>
        <p className="general-title">{title}</p>
        <div className="general-links">
         <p>  {phone!==''? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>):''}  {phone}</p>

          {githubLink!==''? (<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg> <a className="general-profile" target="_blank" href={githubLink}>GitHub Profile</a></div>)
          :''}
       </div>
        <div className="general-links">
          <p>{email!==''?(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
         <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"/>
         <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"/>
         </svg>):''}  {email}</p>

          {linkedinLink!==''?  
          (<div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
          </svg>  <a className="general-profile" target="_blank" href={linkedinLink}>LinkedIn Profile</a></div>)
          :''}
         
        </div>
      </div>
    </>
  );
}

function EducationSectionResume({
  institution,
  course,
  startDate,
  endDate,
}) {
  return (
    <>
      <div className="resume-container">
      <ul className="resume-list">{institution}</ul>
      <div className="date">
      <span className="start-date">{startDate} - </span>
      <span className="end-date">{endDate!==''? endDate: 'Present'}</span>
      </div>
      </div>
      <p className="resume-course">{course}</p>
   </>
  );
}

function ExperienceSectionResume({
  company,
  position,
  description,
  startDate,
  endDate,
}) {
  return (
    <>
      <div className="resume-container">
      <ul className="resume-list">{company}</ul>
      <div className="date">
      <span className="start-date">{startDate} - </span>
      <span className="end-date">{endDate!==''? endDate: 'Present'}</span>
      </div>
      </div>
      <p className="resume-course">{position}</p>
      <p className="resume-description">{description}</p>
    </>
  );
}
export default App;
