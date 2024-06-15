/* eslint-disable react/prop-types */
import { Input } from "./Input";

function ExperienceSection({ fields, onchange, onclick, add, onDelete }) {
  return (
    <>
      {add.map((element) => (
        <div key={element.Id}>
          <AddEducationSection
            company={element.Company}
            position={element.Position}
            Id={element.Id}
            onDelete={onDelete}
          />
        </div>
      ))}
      <div className="education-section">
        <h2>Experience Information</h2>
        <form>
          {fields.map((element) => (
            <div key={element.Id} className="input-container">
              <label>{element.name}</label>
              {element.name === "Description" ? (
                <>
                  <textarea
                    value={element.value}
                    onChange={(e) => onchange(element.name, e.target.value)}
                    name={element.name}
                    type={element.type}
                    maxLength={255}
                  ></textarea>
                </>
              ) : (
                <>
                  <Input
                    value={element.value}
                    onchange={(e) => onchange(element.name, e.target.value)}
                    name={element.name}
                    type={element.type}
                  />
                </>
              )}
            </div>
          ))}
          ;
          <button className="add-btn" onClick={(e) => onclick(e)}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

function AddEducationSection({ company, position, Id, onDelete }) {
  return (
    <>
      <div className="added-Section">
        <div className="institution-container">
          <h3>{company}</h3>
          <button
            className="delete-btn"
            id={Id}
            onClick={(e) => onDelete(e.target.id)}
          >
            Delete
          </button>
        </div>
        <hr  className="section-line"/>
        <p className="course-name">{position}</p>
      </div>
    </>
  );
}
export default ExperienceSection;
