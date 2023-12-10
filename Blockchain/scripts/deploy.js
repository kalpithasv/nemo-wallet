const hre = require("hardhat");

async function main() {
  const lockedAmount = hre.ethers.parseEther("100");
  const SendReceive = await hre.ethers.getContractFactory("sendReceive", {
    value: lockedAmount,
  });

  const sendReceive = await SendReceive.deploy();
  await sendReceive.waitForDeployment();

  console.log("Contract Deployed at:", await sendReceive.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//address = 0xc650302F83F971713bfc1C7D9441c661efd88E49
