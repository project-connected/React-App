import dynamic from "next/dynamic";
import Skeleton from "@material-ui/lab/Skeleton";

const Calendar = dynamic(import("./Calend"), {
	loading: () => <Skeleton variant="rect" className="react-calendar" />,
	ssr: false,
});

export default Calendar;
