describe("local storage length", ()=>{
    let size = 0;
    if (localStorage.length) size = localStorage.length;
    it('should size be equal to 0', ()=>{
        expect(size).toBe(0);
    });
});