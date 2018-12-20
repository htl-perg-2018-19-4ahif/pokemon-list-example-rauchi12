$(document).ready(function () {

    const pokemonList = document.getElementById('container');
  
    (async function () {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const pokelist = await response.json();
  
      let count = 0;
      let html = '<table><tr>';
      for (const pokemon of pokelist.results) {
        if (count == 6) { 
          html += '</tr><tr>';
          count = 0;
        }
        html += '<td><table><tr><td>' + pokemon.name + `</td></tr>`;
        let pokeInfos = await (await fetch(pokemon.url)).json();
        let abilitiesString = '';
        const abilities: any[] = pokeInfos.abilities;
        for (const ability of abilities) {
          abilitiesString += '<tr><td>' + ability.ability.name + '</td></tr>';
        }
        html += `<tr><td><img src="${pokeInfos.sprites.front_default}"></td></tr><tr><td>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#Modal${pokemon.name}">
                    show details
                </button></td></tr></table>`;
        html += `<div class="modal fade" id="Modal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Details for ${pokemon.name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                      <table>
                      <tr><td>Name: ${pokemon.name}</td>
                      <td rowspan="${3 + abilities.length}"><img src="${pokeInfos.sprites.front_default}">
                      <tr><td>Weight: ${pokeInfos.weight}</td></tr>
                      <tr><td>Abilities:</td></tr>
                      ${abilitiesString}
                      </table>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            </td>`;
        count++;
      }
      html += '</table>';
      pokemonList!.innerHTML = html;
    })();
  });