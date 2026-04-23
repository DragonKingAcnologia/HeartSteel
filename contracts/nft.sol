// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; // Import for counter

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    string private baseURI;

    constructor(
        string memory baseURIInput,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(address(msg.sender)) {
        baseURI = baseURIInput;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function mint(address to) external onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function burn(uint256 tokenId) external onlyOwner {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Not owner or approved"
        );
        _burn(tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Transfer functionalities
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Not owner or approved"
        );
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "Not owner or approved"
        );
        _safeTransfer(from, to, tokenId, data);
    }

    // Royalty functionality (example using OpenSea format)
    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return
            super.supportsInterface(interfaceId) || interfaceId == 0x5b5e139f; // ERC2981 interface ID for royalties
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) public view virtual returns (address receiver, uint256 royaltyAmount) {
        require(_exists(tokenId), "Token does not exist");
        // Set royalty receiver (e.g., contract or creator address) and percentage (e.g., 500 = 5%)
        return (address(this), (salePrice * 500) / 10000);
    }

    // Additional function (example: setting token URI for specific token)
    function setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }
}
