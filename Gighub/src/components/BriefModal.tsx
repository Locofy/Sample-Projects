import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useGigHubStore } from "../store/useGigHubStore";
import styles from "./BriefModal.module.css";

const BriefModal = () => {
  const closeBrief = useGigHubStore((state) => state.closeBrief);
  const showToast = useGigHubStore((state) => state.showToast);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast("Add a project title and a little more detail first");
      return;
    }
    closeBrief();
    showToast("Brief created — designers can now send you offers");
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeBrief();
      }}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
      >
        <button
          className={styles.close}
          onClick={closeBrief}
          aria-label="Close project brief"
        >
          <X size={23} />
        </button>
        <div className={styles.modalIntro}>
          <span className={styles.kicker}>
            A better brief gets better offers
          </span>
          <h2 id="brief-title">Let’s create a project brief</h2>
          <p>
            Define your project requirements clearly and make sure you specify
            the timeline and budget as well, if necessary.
          </p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.briefImage}>
            <img
              src="/figma-assets/figma-12.jpeg"
              alt="A creative desk with a laptop"
            />
            <div className={styles.imageCaption}>
              <CheckCircle2 size={15} /> Your next project starts here
            </div>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <label>
              Project title<span>Keep it short and concise</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Design an ecommerce website"
              />
            </label>
            <label>
              Description
              <span>
                This will help the designer understand the goal and direction of
                your project
              </span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="I need..."
                rows={6}
              />
            </label>
            <label className={styles.uploadLabel}>
              Attachments
              <span>Optional, but useful for sharing references</span>
              <span className={styles.upload}>
                <Paperclip size={17} />
                <span>{fileName || "Attach files"}</span>
                <input type="file" onChange={onFileChange} />
              </span>
            </label>
            <button className={styles.submit} type="submit">
              Create brief <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BriefModal;
