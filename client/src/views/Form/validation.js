export const validate = (data) => {
    const regexName = /^[a-zA-Z\s]+$/;
    let errors = {};
  
    if (!data.name) errors.name = "Name activity required";
    else if (data.name.length > 20) errors.name = "Name too long";
    else if (!regexName.test(data.name)) errors.name = "You can only use letters";
  
    if (data.difficulty === 0) errors.difficulty = "Choose difficulty";
    if (data.duration === 0) errors.duration = "Choose duration";
    if (data.season === "") errors.season = "Choose a season";

    if (!data.countries.length) errors.countries = "You must select at least one country"
  
    return errors;
  };