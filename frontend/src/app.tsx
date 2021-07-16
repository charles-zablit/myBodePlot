import React, { useState } from "react";
import { render } from "react-dom";
import  Button  from "react-bootstrap/Button";
import { parse } from "mathjs";
import Tex2SVG from "react-hook-mathjax";
import { FunctionPlot } from "./components/functionPlot.tsx";


function ExpressionRender(props): JSX.Element {
  const expression: string = props.expression;
  const [lastValidInput, setLastValidInput] = React.useState("");
  return (
    <div className="tex-container">
      <Tex2SVG
        class="tex-border"
        tabindex={-1}
        latex={
          typeof expression === "undefined"
            ? lastValidInput
            : 'H(x)='+expression
        }
        onSuccess={() =>
          setLastValidInput(
            typeof expression === "undefined"
              ? lastValidInput
              : 'H(x)='+expression
          )
        }
      />
    </div>
  );
}

function App(props): JSX.Element {
  const [parsedExpression, setParsedExpression] = useState("");
  const [transfert, setTransfert] = useState("");

  return (
    <>
      <form
        className="input"
        onSubmit={(event) => {
          event.preventDefault();
          const expression = parse(event.target.expression.value);
          setParsedExpression(expression.toTex());
          setTransfert(expression.toString());
        }}
      >
        <input name="expression" type="text" placeholder="Votre fonction de transfert" />
        {"  "}
        <Button
          type="submit"
          name="submit"
          variant="secondary"
          style={{ marginLeft: 8, alignContent: "center" }}
        >
          Calculer
        </Button>
      </form>
      <ExpressionRender expression={parsedExpression} />
      <div>
        {transfert && <FunctionPlot fn={transfert} />}
      </div>
    </>
  );
}

render(<App />, document.getElementById("root"));
