const getData = () => {
  let price = Math.floor(Math.random() * 2000);
  let time = Math.random() * 2000;

  console.log(
    "Loading item. Will wait " + time.toFixed(0) + "ms. Price: " + price
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ price });
    }, time);
  });
};

const itemsCount = 12;
const itemPromises = [];
const itemValues = [];

for (let i = 0; i < itemsCount; i++) {
  const promise = getData().then((value) => {
    itemValues.push(value);
  });
  itemPromises.push(promise);
}

// promise chaining to wait for the execution of all promises, so than i can get all the returned data
const chain = itemPromises.reduce(
  (acc, curr) => acc.then(() => curr),
  Promise.resolve()
);

// get returned data from promises chain and process of finding result
chain.then(() => {
  const sortedItemByPrice = itemValues.sort((a, b) => a.price - b.price);
  const totalPrice = sortedItemByPrice.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  console.log(sortedItemByPrice, totalPrice);
});
