// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function deployEPNS() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("EPNSCore");
  const governance = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; //"0x85AB3559001d4Cb34017837DEe138A8e5F6Ef742";
  const lendingPoolProviderAddress = "0x0000000000000000000000000000000000000000";
  const daiAddress = "0xA7c59f010700930003b33aB25a7a0679C860f29c";
  const aDaiAddress = "0x0000000000000000000000000000000000000000";
  const referralCode = 0;
  const contract = await Contract.deploy(governance, lendingPoolProviderAddress, daiAddress, aDaiAddress, referralCode);
  // const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

async function deployDai() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("Dai");
  const name = "Dai";
  const symbol = "xDAI";
  const decimals = 18;
  const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  const contract = await Contract.deploy(name, symbol, decimals, owner);

  await contract.deployed();

  console.log(`${name} Contract deployed to:`, contract.address);
}

// deployDai()
// .then(() => process.exit(0))
// .catch((error) => {
//   console.error(error);
//   process.exit(1);
// });


deployEPNS()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


