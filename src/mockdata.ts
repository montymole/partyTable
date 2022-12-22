const firstNames = ['Cheeseburger', 'Fluffy', 'Sir Loin', 'Captain', 'Princess', 'Bubbles', 'Sassy', 'Peanut', 'Cupcake', 'Peanut Butter'];
const lastNames = ['McFluffernutter', 'Pancake', 'Pickles', 'Buttercup', 'Cheddar', 'Fuzzy', 'Snugglebottom', 'Sprinkles', 'Squeakers', 'Whiskers'];
const addresses = ['123 Sesame Street', '1 Cookie Lane', '5 Gingerbread Court', '7 Rainbow Road', '9 Lollipop Drive', '11 Cupcake Crescent', '13 Marshmallow Way', '15 Peanut Butter Boulevard', '17 Wafer Street', '19 Jellybean Lane', '21 Chocolate Chip Road', '23 Sugarplum Court', '25 Caramel Drive', '27 Honeycomb Way', '29 Fudge Crescent', '31 Lemon Drop Boulevard', '33 Nougat Street', '35 Licorice Lane', '37 Taffy Road', '39 Vanilla Bean Court'];


const pickRandom = ( items:string[] ) => items[Math.round(items.length*Math.random())]


export const generateRandomParty = (numPeople:number):PartyPerson[]  => {

    const table:PartyPerson[] = [];

    while (table.length < numPeople) { 
        table.push({
            id: table.length,
            firstName: pickRandom(firstNames),
            lastName: pickRandom(lastNames),
            address: pickRandom(addresses),
            phone: `+${Math.round(1000*Math.random())}`
        })
    }

    return table;

}