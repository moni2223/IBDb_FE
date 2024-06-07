import "./styles.scss";

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children)

const Checkboxes = ({ options, disabled, onChange, value, label, compulsory, column, style, full }) => {
  return (
    <div className="input-container" style={style}>
      <label className={`flex w-full text-[14px] ml-1 font-base ${style?.display !== "flex" && "mb-2"} capitalize`}>
        {label} {compulsory && <span className={"pl-2 text-black"}>*</span>}
      </label>
      <div className={`checkboxes-container ${column && "column"}`}>
        {options?.map((opt, i) => <ConditionalWrapper
          key={i}
          condition={opt.description}
          wrapper={(children) => <div className="with-wrapper">
            {children}
            <label className="text-xs font-thin ml-[-6px]" >
              {opt.description}
            </label>
          </div>}
        >
          <div
            className={`checkbox-container ${column && "column"}`}
            onClick={() => {
              if (disabled || !onChange) return;
              if (full) onChange(opt);
              else onChange(opt?.value || opt);
            }}
          >
            <div className={`outer-square ${value?.includes(opt.value) && "!border-none"}`}>
              <div className={`tick ${value?.includes(opt.value) && "selected !rounded-none !border-none"}`} />
            </div>
            <label className="text-sm" style={{ paddingLeft: "6px" }}>
              {opt?.label}
            </label>
          </div>
        </ConditionalWrapper>)}
      </div>
    </div>
  );
}

export default Checkboxes;
