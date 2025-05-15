import { HStack, Text } from "@chakra-ui/react";

import { useState, useEffect } from "react";

function Timedate() {
  const [time, setTime] = useState(new Date());
  const [renderTime, setRenderTime] = useState<string>();
  const [renderDate, setRenderDate] = useState<string>();

  useEffect(() => {
    const dateformat = Intl.DateTimeFormat("en-us", {
      dateStyle: "full",
    });

    const intervalId = setInterval(() => {
      setTime(new Date());
      setRenderDate(dateformat.format(time).replace(",", ""));
      let hour;
      if (time.getHours() % 12 === 0) {
        hour = 12;
      } else {
        hour = time.getHours();
      }
      setRenderTime(
        hour +
          ":" +
          time.getMinutes().toString().padStart(2, "0") +
          ":" +
          time.getSeconds().toString().padStart(2, "0") +
          (time.getHours() > 11 ? " PM" : " AM")
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <HStack minW={"18rem"}>
      <Text>{renderDate}</Text>
      <Text>{renderTime}</Text>
    </HStack>
  );
}

export default Timedate;
