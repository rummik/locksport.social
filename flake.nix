{
  description = "Node.js basic flake";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { system = system; };
        nodejs = pkgs.nodejs-14_x;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            nodejs
            (pkgs.yarn.override { inherit nodejs; })
            pkgs.go
          ];

          shellHook = /* sh */ ''
            export PATH=$PATH:$PWD/node_modules/.bin
          '';
        };
      });
}
