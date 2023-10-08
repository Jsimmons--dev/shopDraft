console.log('main.js')

const tiers = 5
const numberOfUnitsInEachTier = [13, 13, 13, 12, 8]
const numberOfCopiesInThePool = [29, 22, 18, 12, 10]

const levels = 11

const rollPercentageForEachLevel = [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [.75, .25, 0, 0, 0],
    [.55, .3, .15, 0, 0],
    [.45, .33, .2, .02, 0],
    [.25, .4, .3, .05, 0],
    [.19, .3, .35, .15, .01],
    [.16, .2, .35, .25, .04],
    [.09, .15, .3, .3, .16],
    [.05, .1, .2, .4, .25],
    [.01, .02, .12, .5, .35],
]

const rollCost = 2

const shopSize = 5

const units = []
for (let tier = 0; tier < tiers; tier++) {
    units[tier] = []
    for (let unit = 0; unit < numberOfUnitsInEachTier[tier]; unit++) {
        units[tier].push({
            cost: tier + 1,
            name: `${tier}-${unit}`
        })
    }
}

console.log(units)
const pool = []
for (let tier = 0; tier < tiers; tier++) {
    const tierPool = []
    for (let unit = 0; unit < numberOfUnitsInEachTier[tier]; unit++) {
        for (let copy = 0; copy < numberOfCopiesInThePool[tier]; copy++) {
            tierPool.push(Object.assign({},units[tier][unit]))
        }
    }
    pool.push(tierPool)
}

console.log(pool)


let shop = []
let level = 1

function reroll(){
    //put remaining shop units back in the pool
    for (let i = 0; i < shop.length; i++) {
        const unit = shop[i]
        pool[unit.cost - 1].push(unit)
    }

    shop = []
    for (let i = 0; i < shopSize; i++) {
        const roll = Math.random()
        let tier = 0
        let tierPercentageSum = rollPercentageForEachLevel[level - 1][tier]
        while(roll > tierPercentageSum && tier < tiers - 1){
            tierPercentageSum += rollPercentageForEachLevel[level - 1][tier]
            tier++
        console.log({tier, tierPercentageSum, roll, rollPercentage: rollPercentageForEachLevel[level - 1][tier]})
        }
        const unitCopy = Math.floor(Math.random() * pool[tier].length)
        shop.push(pool[tier][unitCopy])
        pool[tier].splice(unitCopy, 1) 
    }

    return shop
}


function levelUp(){
    level++
    return level
}

window.shop = shop
window.reroll = reroll
window.levelUp = levelUp
