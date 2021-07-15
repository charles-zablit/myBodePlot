import React, { useEffect, useRef } from "react";
import functionPlot from "function-plot";
import * as mathjs from "mathjs";

function rad2deg(angle:number): number {
  return angle / mathjs.pi * 180;
}

export const FunctionPlot = React.memo(
  ({ fn }) => {
    const rootE1 = useRef(null);
    const rootE2 = useRef(null);

    useEffect(() => {
      try {
        let transfert = fn
        let optionsGain = {
          width: 1000,
          height: 500,
          xAxis: {
            type: "log",
            domain: [0.01, 1000],
            label: "Hz",
          },
          yAxis: {
            domain: [-50, 50],
            label: "dB",
          },
          grid: true,
          data: [
            {
              fn: `20*log(abs(${fn || 1}))`
            },
          ],
        };

        let optionsPhase = {
          width: 1000,
          height: 500,
          xAxis: {
            type: "log",
            domain: [0.01, 1000],
            label: "Hz",
          },
          yAxis: {
            domain: [-90, 0],
            label: "°",
          },
          grid: true,
          data: [
            {
              fn: ((scope)=>{
                const phase = rad2deg(mathjs.compile(transfert).evaluate({x: mathjs.complex(0, scope.x.lo)}).toPolar()["phi"]);
                return ({lo: phase, hi: phase});
              })
            },
          ],
        };

        var gain = functionPlot(
          Object.assign({}, optionsGain, { target: rootE1.current })
        );

        var phase = functionPlot(
          Object.assign({}, optionsPhase, { target: rootE2.current })
        );

        gain.addLink(phase);
        phase.addLink(gain);

      } catch (e) {
        console.log(e);
      }
    });

    return (
      <div>
        <div ref={rootE1} style={{marginBottom: "1rem"}}/>
        <div ref={rootE2} />
      </div>
    );
  },
  () => false
);
