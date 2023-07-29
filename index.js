class Units {
  m = { unit: "m", toMeter: 1 };
  cm = { unit: "cm", toMeter: 0.01 };
  in = { unit: "in", toMeter: 0.0254 };
  ft = { unit: "ft", toMeter: 0.3048 };
}

class Converter {
  constructor(value, from, to) {
    this.value = parseInt(value);
    this.from = from;
    this.to = to;
  }

  convert() {
    console.log(this.value, this.from, this.to);
    console.log(typeof this.to.unit);
    if (this.to.unit == "m") {
      return (this.value * this.from.toMeter).toFixed(4);
    }
    return ((this.value * this.from.toMeter) / this.to.toMeter).toFixed(4);
  }
}

const refs = {
  convertFrom: document.querySelector(".convert-from"),
  convertTo: document.querySelector(".convert-to"),
  input: document.querySelector(".input"),
  output: document.querySelector(".output"),
};

refs.input.addEventListener("input", (event) => {
  if (!refs.input.value.trim()) {
    refs.output.value = "";
    return;
  }

  const from = refs.convertFrom.value;
  const to = refs.convertTo.value;
  const input = refs.input.value.trim();
  const jsonData = JSON.stringify({
    distance: {
      unit: from,
      value: input,
    },
    convertTo: to,
  });
  refs.output.value = convertTo(jsonData);
});

function convertTo(jsonConvertData) {
  const data = JSON.parse(jsonConvertData);
  const units = new Units();

  if (
    Object.hasOwn(units, data.convertTo) &&
    Object.hasOwn(units, data.distance.unit)
  ) {
    const from = units[data.distance.unit];
    const to = units[data.convertTo];
    const converter = new Converter(data.distance.value, from, to);
    return converter.convert();
  }
}
