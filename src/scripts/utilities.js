export function formatDate(date) {
    let year, month, day;

    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString();
    day = date.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  }

  export function literalState(state) {
    let literal = "";

    switch (state) {
      case "accepted":
        literal = "Acceptat";
        break;
      case "published":
        literal = "Publicat";
        break;
      case "refused":
        literal = "Rebutjat";
        break;
      case "doing":
        literal = "En procés";
        break;
      case "finished":
        literal = "Finalitzat";
        break;
    }

    return literal;
  }