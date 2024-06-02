/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Input } from "./Input";

function EducationSection({ fields, onchange, onclick, add, onDelete }) {
  return (
    <>
      {add.map((element) => (
        <div key={element.Id}>
          <AddEducationSection
            institution={element.Institution}
            course={element.Course}
            Id={element.Id}
            onDelete={onDelete}
          />
        </div>
      ))}
      <div className="education-section">
        <h2>Education Information</h2>
        <form>
          {fields.map((element) => (
            <div key={element.Id} className="input-container">
              <label>{element.name}</label>
              <Input
                value={element.value}
                onchange={(e) => onchange(element.name, e.target.value)}
                name={element.name}
                type={element.type}
              />
            </div>
          ))}
          <button className="add-btn" onClick={(e) => onclick(e)}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

function AddEducationSection({ institution, course, Id, onDelete }) {
  return (
    <>
      <div className="added-Section">
        <div className="institution-container">
          <h3>{institution}</h3>
          <button
            className="delete-btn"
            id={Id}
            onClick={(e) => onDelete(e.target.id)}
          >
            Delete
          </button>
        </div>
        <hr />
        <p className="course-name">{course}</p>
      </div>
    </>
  );
}

export default EducationSection;
