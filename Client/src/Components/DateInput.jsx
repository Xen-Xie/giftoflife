import { useTranslation } from "react-i18next";
import { cn } from "../../config/cn";
function DateInput({ value, onChange,className }) {
  const { t } = useTranslation();
  const formLabels = t("signup", { returnObjects: true });
  return (
    <div className="relative w-full max-w-xs">
      <label className="block mb-1 font-semibold text-primary/90">
        {t(formLabels.lastDonated)}
      </label>
      <input
        type="date"
        name="lastDonated"
        value={value}
        onChange={onChange}
        className={cn('input',className)}
        placeholder="Last Donate Date"
      />
      <i
        className="fas fa-calendar-alt absolute right-3 top-4/6 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden="true"
      ></i>
    </div>
  );
}
export default DateInput;
