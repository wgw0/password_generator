const limit = 25;

async function generateRandomString(length, noLetters, noNumbers, noSymbols) {
  if (length > limit) {
    throw new Error("String length is too long.");
  }
  let randomString = "";
  for (let j = 0; j < length; j++) {
    let charCode;
    do {
      charCode = Math.floor(Math.random() * (127 - 32)) + 32;
    } while (
      (noLetters && /[a-zA-Z]/.test(String.fromCharCode(charCode))) ||
      (noNumbers && /[0-9]/.test(String.fromCharCode(charCode))) ||
      (noSymbols && /[^a-zA-Z0-9\s]/.test(String.fromCharCode(charCode)))
    );
    randomString += String.fromCharCode(charCode);
  }
  return randomString;
}

// Add an event listener to the generate button
document.getElementById("generate").addEventListener("click", function() {
  generateOutput();
  document.getElementById("copyButton").textContent = ("Copy to clipboard");
});

// Generate and display the output
async function generateOutput() {
  // Get the desired length from the input field
  let length = document.getElementById("length").value;

  // Get the checkbox values
  let noLetters = document.getElementById("noLetters").checked;
  let noNumbers = document.getElementById("noNumbers").checked;
  let noSymbols = document.getElementById("noSymbols").checked;

  // Generate the random string
  try {
    let result = await generateRandomString(length, noLetters, noNumbers, noSymbols);

    // Set the output label text to the generated string
    document.getElementById("output").textContent = result;
  } catch (error) {
    // Show the error message in the output label
    document.getElementById("output").textContent = error.message;
  }
}

window.addEventListener("load", function() {
  try {
    const limitCount = document.getElementById("limitCount");
    document.getElementById("limitCount").textContent = limit;
  } catch {
    document.getElementById("limitCount").textContent = "error getting limit";
  }
});

const copyButton = document.getElementById("copyButton");
const output = document.getElementById("output");

copyButton.addEventListener("click", () => {
  const textToCopy = output.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    document.getElementById("copyButton").textContent = ("Password copied to clipboard!");
  }).catch(() => {
    document.getElementById("copyButton").textContent = ("Failed to copy password to clipboard");
  });
});

const strengthTester = document.getElementById("strengthTester");
const strengthOutput = document.getElementById("strengthOutput");

strengthTester.addEventListener("keypress", () => {
  generateStrength()
});

async function generateStrength() {
  const input = strengthTester.value;
  const inputLength = input.length;
  let hasSymbolsOrNumbers = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(input);

  if (inputLength < 4) {
    strengthOutput.textContent = "Weak";
  } else if (inputLength < 8 && !hasSymbolsOrNumbers) {
    strengthOutput.textContent = "Weak";
  } else if (inputLength < 8) {
    strengthOutput.textContent = "Quite Weak";
  } else if (inputLength < 12 && !hasSymbolsOrNumbers) {
    strengthOutput.textContent = "Average";
  } else if (inputLength < 12) {
    strengthOutput.textContent = "Average";
  } else {
    strengthOutput.textContent = "Strong";
  }
  
}