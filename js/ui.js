import { Games } from './games.js'
import { Details } from './details.js'

const games = new Games();
const details = new Details();
const displayArea = $('.games').eq(0);
const gamesUi = $('.games-ui').eq(0);
const detailsUi = $('.details-ui').eq(0);

let gamesArray = [];

export class Ui {

    //Fire all functions across the constructor
    constructor() {
        this.displayGames(() => {
            this.displayGameDetails(this.closeDetails)
        });
        this.changeCategory();
        this.navColor();
    }


    //display games cards after fetch games data from Games class
    async displayGames(callback) {

        gamesArray = await games.getGamesByCategory($('.active')[0].text.toLowerCase());

        let gamesDivs = '';

        for (let i = 0; i < gamesArray.length; i++) {
            gamesDivs += `<div class="col-lg-3 col-md-6">
                            <div class="game card bg-black-dark mb-4 shadow">
                                <img class="card-img-top object-fit-contain"src=${gamesArray[i].thumbnail} alt='${gamesArray[i].title} img'>
                                    <div class="card-body text-white">
                                        <div class="card-title d-flex justify-content-between align-items-center">
                                            <h5>${gamesArray[i].title}</h5>
                                            <p class="bg-medium-green text-white rounded-2 fw-bold px-2 py-1">Free</p>
                                        </div>
                                        <h6 class="fw-normal card-text">${gamesArray[i].short_description.split(' ').slice(0, 9).join(' ')}</h6>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between">
                                        <p class="bg-medium-green text-white fw-bold rounded-2 px-2 py-1 m-0">${gamesArray[i].genre}</p>
                                        <p class="bg-medium-green text-white fw-bold rounded-2 px-2 py-1 m-0">${gamesArray[i].platform}</p>
                                    </div>
                            </div>
                        </div>`

        }

        displayArea.html(gamesDivs);

        callback()
    }

    //change category by click on navbar
    changeCategory() {
        $('.nav-item').click((e) => {
            displayArea.html(`<div class="loading mt-5 d-flex justify-content-center align-items-center">
                        <span class="loader"></span>
                    </div>`)
            $('.nav-link').removeClass('active');
            $(e.target).addClass('active');
            this.displayGames(() => {
                this.displayGameDetails(this.closeDetails)
            });
        })
    }

    //display game details after fetch game details from Details class
    displayGameDetails(callback) {
        $('.card').each(function (index) {
            $(this).on('click', async () => {

                $('body').css('background-image', 'none');
                gamesUi.addClass('d-none');

                detailsUi.removeClass('d-none');

                let game = await details.getGameDetails(gamesArray[index].id)

                detailsUi.html(`
                            <div class="col-md-5">
                                <img class="w-100 rounded-3" src=${game.thumbnail} alt='${game.title} img'>
                            </div>
                            <div class="col-md-7 text-white">
                                <h2>Title: <span>${game.title}</span></h2>
                                <h6>Category: <span class="bg-medium-green px-2 rounded-2">${game.genre}</span></h6>
                                <h6>Platform: <span class="bg-medium-green px-2 rounded-2">${game.platform}</span></h6>
                                <h6>Status: <span class="bg-medium-green px-2 rounded-2">${game.status}</span></h6>
                                <p>${game.description}</p>
                                <a href=${game.game_url} target='_blank' class="btn btn-outline-success fw-bold">Show Game</a>
                                <button type="button" class="btn-close position-absolute top-0 end-0 btn-close-white" aria-label="Close"></button>
                            </div>`)
                callback()
            });
        });



    }

    //close details and show games cards
    closeDetails() {
        document.querySelector('.btn-close').addEventListener('click', () => {
            $('body').css('background-image', 'url(../imgs/wraper.png)');
            detailsUi.addClass('d-none');
            gamesUi.removeClass('d-none');
            detailsUi.html(`<div class="loading mt-5 d-flex justify-content-center align-items-center">
                                <span class="loader"></span>
                            </div>`
            )

        })
    }

    //change navbar color after intersect with cards
    navColor() {
        addEventListener('scroll', function () {
            if (this.scrollY > 200) {
                $('.nav-data').removeClass('bg-black-dark');
                $('.nav-data').addClass('bg-scrollable-nav');
            }
            else {
                $('.nav-data').addClass('bg-black-dark');
                $('.nav-data').removeClass('bg-scrollable-nav');
            }
        })
    }
}









