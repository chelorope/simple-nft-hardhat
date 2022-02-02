// An NFT Contract
// Where the tokenURI can be one of 3 different arworks
// Randomly selected

// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.7/VRFConsumerBase.sol";

contract Collectible is ERC721, VRFConsumerBase {
  address private owner;
  uint256 public tokenCounter;
  bytes32 public keyhash;
  uint256 public fee;
  enum Artwork {
    TWO_OWLS,
    DOGS_HEAD,
    DECEMBER_CAT
  }
  mapping(uint256 => Artwork) public tokenIdToArtwork;
  mapping(Artwork => string) public artworkToUri;
  mapping(bytes32 => address) public requestIdToSender;
  event requestedCollectible(bytes32 indexed requestId, address requester);
  event artworkAssigned(uint256 indexed tokenId, Artwork artwork);

  constructor(
    address _vrfCoordinator,
    address _linkToken,
    bytes32 _keyhash,
    uint256 _fee
  )
    public
    VRFConsumerBase(_vrfCoordinator, _linkToken)
    ERC721("Graag", "GRAG")
  {
    tokenCounter = 0;
    keyhash = _keyhash;
    fee = _fee;
    owner = msg.sender;
  }

  function createCollectible() public returns (bytes32) {
    require(tokenCounter < 2, "All collectibles were already minted");
    bytes32 requestId = requestRandomness(keyhash, fee);
    requestIdToSender[requestId] = msg.sender;
    emit requestedCollectible(requestId, msg.sender);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
    internal
    override
  {
    Artwork artwork = Artwork(randomNumber % 3);
    uint256 newTokenId = tokenCounter;
    tokenIdToArtwork[newTokenId] = artwork;
    emit artworkAssigned(newTokenId, artwork);
    address sender = requestIdToSender[requestId];
    _safeMint(sender, newTokenId);
    _setTokenURI(newTokenId, artworkToUri[artwork]);
    tokenCounter = tokenCounter + 1;
  }

  function setArtworkURI(Artwork artworkName, string memory _artworkUri)
    public
  {
    require(
      keccak256(abi.encode(artworkToUri[artworkName])) != keccak256(""),
      "Artwork metadata URI is already assigned"
    );
    require(_msgSender() == owner, "ERC721: caller is not owner");
    artworkToUri[artworkName] = _artworkUri;
  }
}
