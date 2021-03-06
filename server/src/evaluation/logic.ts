export function progressBar(group) {
  let r = 0;
  let y = 0;
  let g = 0;
  let w = 0;

  const percentage = 100

  group.student.map(student => {
    let lastMark = student.day.slice(-1)[0]

    if (lastMark === undefined || null) { return w += 1 }
    else if (lastMark.colour === "G") { return g += 1 }
    else if (lastMark.colour === "R") { return r += 1 }
    else if (lastMark.colour === "Y") { return y += 1 }
  }
  )
  let countStudents = r + g + y + w
  let totalR = r / countStudents * percentage;
  let totalG = g / countStudents * percentage;
  let totalY = y / countStudents * percentage;
  let totalW = w / countStudents * percentage;

  r = totalR;
  y = totalY;
  g = totalG;
  w = totalW;

  console.log(r, y, g, w)
  return { r, y, g, w }
}

export function randomStudent(group) {

  let colour
  const randomColour = Math.random() * 100

  if (randomColour <= 19) {
    colour = "G"
  } else if (randomColour <= 28) {
    colour = "Y"
  } else {
    colour = "R"
  }

  var dangerousStudent = []
  group.student.map(student => {

    let lastMark = student.day.slice(-1)
      .map(day => day.colour)[0]
    console.log(lastMark)

    if (lastMark === colour) { dangerousStudent.push(student) }
    else null
  })

  let studentAsk = dangerousStudent[Math.floor(Math.random() * dangerousStudent.length)]

  return studentAsk

}
