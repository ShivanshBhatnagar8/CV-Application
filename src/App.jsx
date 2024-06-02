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
  console.log(experienceValues);
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
    console.log(company);
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
    }
  }

  function handleDeleteEducationSection(Id) {
    const newArr = addEducationSection.filter(
      (element) => element.Id !== Number(Id)
    );
    setEducationSection(newArr);
  }

  function handleDeleteExperienceSection(Id) {
    const newArr = addExperienceSection.filter(
      (element) => element.Id !== Number(Id)
    );
    setExperienceSection(newArr);
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
        <a href="#" className="btn-download">
          Click to Download
        </a>
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
        <section className="resume-section">
          <div className="general-information">
            <GeneralSectionResume fields={fields} />
          </div>
          <div className="education-information">
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
    Description,
    Github,
    Linkedin,
  ] = [...fields];

  let fullName = firstName.value + lastName.value;
  let title = Title.value;
  let email = Email.value;
  let phone = Phone.value;
  let description = Description.value;
  let githubLink = Github.value;
  let linkedinLink = Linkedin.value;
  return (
    <>
      <div className="fullName">
        <h2>{fullName}</h2>
      </div>
    </>
  );
}

function EducationSectionResume({
  institution,
  course,
  title,
  startDate,
  endDate,
}) {
  return (
    <>
      <h1>{institution}</h1>
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
  console.log(company);
  return (
    <>
      <h1>{company}</h1>
    </>
  );
}
export default App;
