export default function Steps() {
    return (
        <section className="md:py-40 py-20 bg-white">
            <div className="max-w-7xl mx-auto md:px-20 px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="text-center max-w-70 mx-auto">
                        <div className="p-2 border border-dashed border-primary rounded-full w-fit h-fit mx-auto mb-4">
                            <div className="bg-[#F9F6F4] rounded-full w-20 h-20 flex items-center justify-center">
                                <span className="text-primary font-bold text-2xl">1</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-ppmori-semibold mb-2">Join & Subscribe</h3>
                        <p className="text-sub-foreground font-ppmori">Quick registration and one low annual fee for unlimited access</p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center max-w-70 mx-auto">
                        <div className="p-2 border border-dashed border-primary rounded-full w-fit h-fit mx-auto mb-4">
                            <div className="bg-[#F9F6F4] rounded-full w-20 h-20 flex items-center justify-center">
                                <span className="text-primary font-bold text-2xl">2</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-ppmori-semibold mb-2">Get Your Digital ID</h3>
                        <p className="text-sub-foreground font-ppmori">Instant access to your unique membership QR code on any device.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center max-w-70 mx-auto">
                        <div className="p-2 border border-dashed border-primary rounded-full w-fit h-fit mx-auto mb-4">
                            <div className="bg-[#F9F6F4] rounded-full w-20 h-20 flex items-center justify-center">
                                <span className="text-primary font-bold text-2xl">3</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-ppmori-semibold mb-2">Show ID at Stores</h3>
                        <p className="text-sub-foreground font-ppmori">Present your ID at checkout with our partners to avail discounts</p>
                    </div>
                </div>
            </div>
        </section>
    );
}