import { FormControlLabel, Checkbox } from "@mui/material";

export default function FilterBrands({
  allBrands,
  filterContext,
  setFilterContext,
}) {
  const checkBrandChange = (e) => {
    let newValue = parseInt(e.target.value);
    const checkedBrands = [...filterContext.brands];
    const index = checkedBrands.indexOf(newValue);
    if (index === -1) {
      checkedBrands.push(newValue);
    } else {
      checkedBrands.splice(index, 1);
    }
    setFilterContext({ ...filterContext, brands: checkedBrands });
  };

  return (
    <>
      {allBrands.map((item) => (
        <div key={item.id}>
          <FormControlLabel
            label={item.title}
            control={
              <Checkbox
                name="brands"
                checked={filterContext.brands.includes(item.id)}
                color="default"
                value={item.id}
                onChange={(e) => checkBrandChange(e)}
              />
            }
          />
        </div>
      ))}
    </>
  );
}
