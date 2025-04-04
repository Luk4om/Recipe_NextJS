import CardFood from '@/components/CardFood';
import Footer from '@/components/Footer';
import Headcardfood from '@/components/Headcardfood';
import Navbar from '@/components/Navbar';

export default function Index() {
    return (
        <main className="flex flex-col w-full min-h-screen justify-between bg-[#fbffee]">
            <header>
                <Navbar />
            </header>

            <section className="flex flex-col p-5">
                <h2 className="text-5xl font-bold text-center text-[#333] my-8">Suggestion</h2>
                <div className="flex justify-center p-5">
                    <Headcardfood />
                </div>
            </section>

            <section className="flex flex-col p-5">
                <h2 className="text-5xl font-bold text-center text-[#333] my-8">Popular</h2>
                <div className="flex justify-center p-5">
                    <CardFood />
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </main>
    );
}
