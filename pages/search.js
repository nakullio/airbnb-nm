import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { format } from "date-fns"
import InfoCard from "../components/InfoCard";

function Search({searchResults}) {
    const router = useRouter();

    // ES6 Destructuring method
    const { location, startDate, endDate, noOfGuests} = router.query;

    // format the strings for make it cleaner
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    // create a string from two values above, use backtic thaw will allow us include javaScript in a string
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap ">
                     <p className="button" >Cancelation Flexibility</p>
                     <p className="button" >Type of Place</p>
                     <p className="button" >Price</p>
                     <p className="button" >Rooms and Beds</p>
                     <p className="button" >More filters</p>
                    </div>

                    <div className="flex flex-col">
                    {/* map the serach results item */}
                    {searchResults.map(({img, location, title, description, star, price, total}) => (
                        <InfoCard 
                        // whenever we map through something, ensure giving a key, which the key is uniqe identifier to that component
                        key={img}
                            img={img}
                            location={location}
                            title={title}
                            description={description}
                            star={star}
                            price={price}
                            total={total}
                        />
                    ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search


// implementing search result using server side rendering
export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz").then(res => res.json())

    return {
        props: {
            searchResults,
        }
    }

}
