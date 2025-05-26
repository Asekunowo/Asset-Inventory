import { Outlet, useLocation, Link } from "react-router-dom";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { BackArrow } from "@/store/icons";
import Loader from "../ui/load";
import Sessionexpired from "../error/sessionexpired";
import Unexpected from "../error/unexpected";
import { useEffect, useState } from "react";
import { ReportPeriod, ReportRange } from "@/types/types";
import {
  DEFAULT_REPORT_PERIOD,
  DEFAULT_REPORT_RANGE,
} from "@/types/definitions";

import { CheckSession } from "@/utils/functions";
import { SERVER_URI } from "@/utils/secrets";
import { toaster } from "../ui/toaster";
import Reportperiod from "./reportperiod";
import { exportExcel } from "./generatereport";

const Reports = () => {
  const location = useLocation();

  const [load, setLoad] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>(
    DEFAULT_REPORT_PERIOD
  );
  const [reportRange, setReportRange] =
    useState<ReportRange>(DEFAULT_REPORT_RANGE);

  const path = location.pathname;

  useEffect(() => {
    const data = async () => {
      try {
        const data = await CheckSession();
        if ("res" in data && data.res === 401) {
          setExpired(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoad(false);
      }
    };
    setTimeout(() => {
      data();
    }, 300);
  }, []);

  useEffect(() => {
    if (reportPeriod.timerange) {
      setReportRange({ ...reportRange, byMonth: false });
    } else {
      setReportRange({ ...reportRange, byMonth: true });
    }
  }, [reportPeriod.timerange]);

  const validatePeriod = (): boolean => {
    if (reportPeriod.timerange) {
      if (!reportRange.from || !reportRange.to) {
        toaster.create({
          type: "error",
          title: "Input Error",
          description: "Please select both From and To dates.",
        });
        return false;
      }
      if (reportRange.from > reportRange.to) {
        toaster.create({
          type: "error",
          title: "Input Error",
          description: "'From' date cannot be after 'To' date.",
        });
        return false;
      }
    } else if (reportPeriod.month) {
      if (!reportRange.month) {
        toaster.create({
          type: "error",
          title: "Input Error",
          description: "Please select a month.",
        });
        return false;
      }
    }
    return true;
  };

  const generateReport = (name: string): void => {
    try {
      if (!validatePeriod()) {
        return;
      }
      const promise = new Promise<[any, any]>(async (resolve, reject) => {
        const res = await fetch(`${SERVER_URI}/api/reports/${name}`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportRange),
        });
        const data = await res.json();

        if (!data.report[0]) {
          reject([false, "No data for this period"]);
        }

        await exportExcel(data.report, name);

        resolve([data.success, data.message]);
      });

      toaster.promise(promise, {
        success: {
          title: promise.then((message) => message[1]),
          description: "",
        },
        error: {
          title: "Report Generation failed",
          description: promise.catch((message) => message[1]),
        },
        loading: { title: "Generating Report...", description: "Please wait" },
      });
    } catch (error: any) {
      console.error(error);
      toaster.create({
        type: "error",
        title: "An unexpected Error Occurred",
        description: "Please try again...",
      });
    }
  };

  if (load) {
    return <Loader />;
  }

  if (error) {
    <Unexpected error={error} />;
  }

  return (
    <>
      <VStack
        id="print"
        textAlign={"left"}
        alignItems={"left"}
        overflow={"hidden"}
      >
        {expired && <Sessionexpired />}
        <VStack
          mt={10}
          gap={"10rem"}
          justifyContent={"space-between"}
          bg={"white"}
          rounded={"md"}
          minH={"100vh"}
        >
          <Box
            rounded={"md"}
            w={"full"}
            p={"1rem"}
            spaceY={"4"}
            bg={"white"}
            pos={"relative"}
          >
            <HStack>
              <Heading
                float={"left"}
                size={"2xl"}
                padding={"1rem"}
                textTransform={"uppercase"}
                display={"block"}
                ml={-2}
              >
                Reports
              </Heading>
            </HStack>
            {path.includes("gen") && (
              <Link to={"/reports"}>
                <Button
                  colorPalette={"gray"}
                  variant={"surface"}
                  rounded={"md"}
                >
                  <BackArrow />
                  Back
                </Button>
              </Link>
            )}

            {!path.includes("gen") && (
              <>
                <Reportperiod
                  reportPeriod={reportPeriod}
                  reportRange={reportRange}
                  setReportPeriod={setReportPeriod}
                  setReportRange={setReportRange}
                />

                <div className="grid grid-cols-3 gap-6 justify-items-center ">
                  {reports.map((report) => (
                    <Link to={`gen`} key={report}>
                      <Button
                        colorPalette={"black"}
                        variant={"outline"}
                        w={"13rem"}
                        textTransform={"capitalize"}
                        onClick={() => generateReport(report)}
                      >
                        Generate{" "}
                        {report.includes("other")
                          ? "Other Assets"
                          : path.includes("assets")
                          ? "Laptops"
                          : report}{" "}
                        report
                      </Button>
                    </Link>
                  ))}
                </div>
              </>
            )}
            <Box>
              <Outlet />
            </Box>
          </Box>
        </VStack>
      </VStack>
    </>
  );
};

const reports = ["assets", "repairs", "otherassets", "movements", "exits"];

export default Reports;
