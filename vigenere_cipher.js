const pipe = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg)

const data = {
	string: 'loremipsumdolorsitametsdfsd',
	key: 'klobasa',
	alphabet: 'abcdefghijklmnopqrstuvwxyz'
}


const calculateQuotientAndModulo = data => {
	const { string, key } = data
	return {
		... data, 
		quotient: Math.floor(string.length / key.length), 
		remainder: string.length % key.length
	}
}

const buildKeystream = data => {
	const { key, quotient, remainder } = data

	let keystream = ''

	for (i = 0; i < quotient; i++) keystream+= `${key}`

	keystream+= key.substring(0,remainder);
	
	return { ... data, keystream}
}

const applyVigenereCypher = data => {
	const { string, keystream, alphabet } = data

	let cypher = ''
	for (i = 0; i < keystream.length; i++) {
		const newCharPosition = (alphabet.indexOf(string[i]) + alphabet.indexOf(keystream[i])) % 26
		cypher+= `${alphabet[newCharPosition]}`
	}
	return {
		...data,
		cypher
	}
}


const VigenereCypher = pipe(
	calculateQuotientAndModulo,
	buildKeystream,
	applyVigenereCypher
	)(data)

// console.log(VigenereCypher)	

// ----------------------------------------------------------------------

const reverseVigenereCypher = data => {
	const { string, keystream, alphabet } = data

	let decyphered = ''
	for (i = 0; i < keystream.length; i++) {
		const newCharPosition = ((alphabet.indexOf(string[i]) - alphabet.indexOf(keystream[i])) + 26) % 26
		decyphered+= `${alphabet[newCharPosition]}`
	}
	return {
		...data,
		decyphered
	}
}


const cypheredData = { 
	string: 'vzffmapcfaeodobdwuaeeddrgsv' ,
	key: 'klobasa',
	alphabet: 'abcdefghijklmnopqrstuvwxyz'
}



const vigenereDecypher = pipe(
	calculateQuotientAndModulo,
	buildKeystream,
	reverseVigenereCypher
	)(cypheredData)

// console.log(vigenereDecypher)		

// ----------------------------------------------------------------------


const cypheredData1 = { 
	string: 'utahelhusbxlzazymvxxgelauogdtemoqrtukghcqrgtqnmuatmvasmyanzmarmoqlbiqrmpqshmutlwqoisqctuneladognqnhbshmvyabufabuutlljilaqnvlunzyqamlyeknqnvpqshufhbzbobuftalbrxzqnmyqbxsxihunrhbshmvgrklbuusucmvmsxcqrxaqsmhzdmoqpkleiwlztbhxeelotbvzovjgrkpzgbudezbxakjaukzqdnyunzateklneesuoghpdxkzomhximaxemvfhxzfrtpztaletkprehmfhxlxevauogpebnatufhzntagrxwdavauctsxytwblblpthateyhotlpztaloall' ,
	alphabet: 'abcdefghijklmnopqrstuvwxyz'
}

const countLetterOccurance = data => {
	const { string, alphabet } = data

	let letterOccuranceList = {}

	let uberCount = 0

	for (i = 0; i < alphabet.length; i++) {
		let letter = alphabet[i]		
		let re = new RegExp(letter, 'g');
		let count = string.match(re) ? string.match(re).length : 0

		uberCount = uberCount + count * (count-1)
		letterOccuranceList[letter] = count
	}

	console.log(uberCount)
	let neki = string.length * (string.length - 1)
	let nekiDrucga = uberCount / neki

	let nekiTretjiga = (0.067 - 0.0385) / (nekiDrucga - 0.0385)

	// console.log(nekiDrucga)
	console.log(nekiTretjiga)
}

const vigenereBreak = pipe(
	countLetterOccurance
	)(cypheredData1)


// console.log(vigenereBreak)




