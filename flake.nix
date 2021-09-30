{
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.lspkgs.url = "github:locksport/nix-flakes";

  outputs = { self, nixpkgs, lspkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs-16_x;
      in
      rec {
        devShell = pkgs.mkShell {
          buildInputs = [
            nodejs
            (pkgs.yarn.override { inherit nodejs; })
            pkgs.go
            lspkgs.packages.${system}.deta
          ];

          shellHook = /* sh */ ''
            export PATH=$PATH:$PWD/node_modules/.bin
          '';
        };
      }
    );
}
