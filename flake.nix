{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = pkgs.mkShell {
        buildInputs = [
          pkgs.just
          pkgs.miniserve
          pkgs.starship
          pkgs.watchexec
        ];
        shellHook = ''
          source .env
          eval "$(starship init bash)"
        '';
      };
    });
}
