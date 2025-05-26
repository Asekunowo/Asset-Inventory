import { Text, Input } from "@chakra-ui/react";
import CustomSelect from "../reusable/customselect";
import { Months } from "@/store/data";
import {
  firstDay,
  formatDate,
  formatMonth,
  getDateFromMonthName,
  lastDay,
} from "@/utils/functions";

const Reportperiod = ({
  reportPeriod,
  reportRange,
  setReportPeriod,
  setReportRange,
}: any) => {
  return (
    <div>
      <form className="flex mx-10 gap-10">
        <div>
          <span className="flex gap-2">
            <input
              type="radio"
              name="by"
              id="timerange"
              checked={reportPeriod.timerange}
              onChange={() =>
                setReportPeriod({
                  month: false,
                  timerange: true,
                })
              }
            />
            <label htmlFor="timerange">
              <Text
                textTransform={"uppercase"}
                fontSize={"1.5rem"}
                fontWeight={"bold"}
              >
                Time Range
              </Text>
            </label>
          </span>
          <div>
            <b>From:</b>
            <Input
              type="date"
              disabled={reportPeriod.month}
              value={
                reportPeriod.timerange
                  ? formatDate(reportRange.from)
                  : firstDay(reportRange.from)
              }
              onChange={(e) =>
                setReportRange({
                  ...reportRange,
                  from: new Date(e.target.value),
                })
              }
            />
          </div>

          <div>
            <b>To:</b>
            <Input
              type="date"
              disabled={reportPeriod.month}
              value={
                reportPeriod.timerange
                  ? formatDate(reportRange.to)
                  : lastDay(reportRange.to)
              }
              onChange={(e) =>
                setReportRange({
                  ...reportRange,
                  to: new Date(e.target.value),
                })
              }
            />
          </div>
        </div>
        <div className="">
          <span className="flex gap-2">
            <input
              type="radio"
              name="by"
              id="month"
              checked={reportPeriod.month}
              onChange={() =>
                setReportPeriod({
                  month: true,
                  timerange: false,
                })
              }
            />
            <label htmlFor="month">
              <Text
                textTransform={"uppercase"}
                fontSize={"1.5rem"}
                fontWeight={"bold"}
              >
                Month
              </Text>
            </label>
          </span>
          <div>
            <b>Month</b>

            <CustomSelect
              disabled={reportPeriod.timerange}
              defaultValue="MONTH" //laptop by default
              value={formatMonth(reportRange.month!)}
              onChange={(value: any) =>
                setReportRange({
                  ...reportRange,
                  from: getDateFromMonthName(value),
                  to: getDateFromMonthName(value),
                  month: getDateFromMonthName(value),
                })
              }
              options={Months}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reportperiod;
