export default function (name) {
  if (name.length > 0) {
    const arr = name.split(" ");
    const size = arr.length;
    const nameExtension = ["DA", "DE", "DO", "DOS", "DAS", "E"];

    for (let i = 0; i < size; i++) {
      if (nameExtension.includes(arr[i].toUpperCase())) {
        arr[i] = arr[i].toLowerCase();
      } else {
        arr[i] =
          arr[i].charAt(0).toUpperCase() +
          arr[i].slice(1).toLowerCase();
      }
    }
    return arr.join(" ");
  }
  return "";
}