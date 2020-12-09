const transformToStringWithCommas = input => input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
