




let cMajScale = [
        
    ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']
    ,
    [
        'C 1st Inversion', 'C 2nd Inversion','Dm 1st Inversion', 'Dm 2nd Inversion', 'Em 1st Inversion', 'Em 2nd Inversion', 'F 1st Inversion', 'F 2nd Inversion', 'G 1st Inversion', 'G 2nd Inversion', 'Am 1st Inversion', 'Am 2nd Inversion', 'Bdim 1st Inversion', 'Bdim 2nd Inversion'
    ],
    [
        'C6', 'Dm6', 'Em6', 'F6', 'G6', 'Am6', 'Bdim6'
    ],
    [
        'Cmaj7', 'Dmin7', 'Emin7', 'FMaj7', 'G7', 'Amin7'
    ],
    [
        'CMaj9', 'Dmin9', 'Emin9', 'FMaj9', 'G9', 'Amin9'
    ],
    [
        'Csus4', 'Dsus4', 'Esus4', 'Gsus4', 'Asus4'
    ]
]

const randomizeChords = (arr) => {

    
    let counter = 0
    let chordProgression = []
    while(counter < 4) {
        let randomIndex = Math.floor(Math.random() * arr.length)
        let randomArr = arr[randomIndex]
        let randomChord = Math.floor(Math.random() * randomArr.length)
        chordProgression.push(randomArr[randomChord])

        counter++
    }
    return chordProgression
}

console.log(randomizeChords(cMajScale))