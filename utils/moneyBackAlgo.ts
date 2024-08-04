export const payBack = (coinsAvailability: {[key: number]: number}, diff: number) => {
  const coins = [10000, 5000, 1000, 500, 100]
    const usedCoins = []
    const availabities = {...coinsAvailability}
    let found = false
    while (diff > 0) {
      found = false
      for (let i = 0; i < coins.length; ++i) {
        if (coins[i] <= diff && availabities[coins[i]] > 0) {
          usedCoins.push(coins[i])
          --availabities[coins[i]]
          diff -= coins[i]
          found = true
          break
        }
      }
      if (!found) {
        throw new Error("Impossible to give cash back");
      }
    }
    return availabities
}
