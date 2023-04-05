import { toast } from "react-toastify";
import { buildHTMLText } from "../../assets/js/helpers";

function TextEditor({ body, selection, SetSelection, setFormData }) {
  const addCategory = (e) => {
    e.preventDefault();
    if (selection) {
      let result = buildHTMLText(false, selection, body);
      SetSelection(null);
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
    } else {
      toast.info("No text selected.");
    }
  };

  const addCharacter = (e) => {
    e.preventDefault();
    if (selection) {
      let result = buildHTMLText(true, selection, body);
      SetSelection(null);
      setFormData((prevState) => ({
        ...prevState,
        body: result,
      }));
    } else {
      toast.info("No text selected.");
    }
  };

  return (
    <div className="text-editor">
      <label>Linkify</label>
      <section>
        <button className="btn-function" onClick={(e) => addCharacter(e)}>
          Character
        </button>
        <button className="btn-function" onClick={(e) => addCategory(e)}>
          Category
        </button>
      </section>
    </div>
  );
}

export default TextEditor;
