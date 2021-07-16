import React, { useEffect, useRef } from "react";
import functionPlot from "function-plot";
import { pi, compile, complex } from "mathjs";

function rad2deg(angle:number): number {
  return angle / pi * 180;
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
              // Il y a un bug dans le code qui multiplie les valeurs
              // de cette fonction par 2. On divise donc par 2 
              // (i.e 20 devient 10 ici).
              fn: `10*log(abs(${fn || 1}))`
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
                const phase = rad2deg(compile(transfert).evaluate({x: complex(0, scope.x.lo)}).toPolar()["phi"]);
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
        <div ref={rootE2} style={{marginBottom: "1rem"}}/>
      </div>
    );
  },
  () => false
);
