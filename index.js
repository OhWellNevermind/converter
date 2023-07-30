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
    if (this.to.unit == "m") {
      return JSON.stringify({
        unit: this.to.unit,
        value: (this.value * this.from.toMeter).toFixed(2),
      });
    }
    return JSON.stringify({
      unit: this.to.unit,
      value: ((this.value * this.from.toMeter) / this.to.toMeter).toFixed(2),
    });
  }
}

const refs = {
  convertFrom: document.querySelector(".convert-from"),
  convertTo: document.querySelector(".convert-to"),
  input: document.querySelector(".input"),
  output: document.querySelector(".output"),
  converterContainer: document.querySelector('.converter-container'),
  form: document.querySelector('.add-form')
};
const units = new Units()

refs.converterContainer.addEventListener('input', handleInput)
refs.form.addEventListener('submit', addUnit)


function convertTo(jsonConvertData) {
  const data = JSON.parse(jsonConvertData);
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

function handleInput() {
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
  const value = JSON.parse(convertTo(jsonData));
  refs.output.value = value.value;
}

function addUnit(event){
  event.preventDefault()

  const {
    elements: { unit,unitFull, toMeters }
  } = event.currentTarget;

  const unitValue = unit.value.trim()
  const unitFullValue = unitFull.value.trim()
  const toMetersValue = toMeters.value.trim()

  if(!unitValue || !unitFullValue || !toMetersValue) {
    alert('Please fill all fields')
    return
  }

    refs.convertFrom.insertAdjacentHTML('beforeend', `<option value="${unitValue}">${unitFullValue}</option>`)
    refs.convertTo.insertAdjacentHTML('beforeend', `<option value="${unitValue}">${unitFullValue}</option>`)
    Object.defineProperty(units, unitValue, {
      value: {
    unit: unitValue, toMeter: parseFloat(toMetersValue)
    },
    writable:false
  })

}
