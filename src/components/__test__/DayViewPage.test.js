import React from "react";
import jest from "jest";
import { cleanup, fireEvent, render } from "@testing-library/react";

import DayViewPage from "components/dayView/DayViewPage";
import DayTable from "components/dayView/DayTable";

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				tables: [
					[
						"მათემატიკა,9:00,9:35",
						"ქართული,9:40,10:15",
						"ქიმია,10:40,11:15",
						"ინგლისური,11:15,11:35",
						"ისტორია,11:40,12:15",
					],
					[
						"ქართული,9:00,9:35",
						"ფიზიკა,9:40,10:15",
						"მათემატიკა,10:20,10:55",
						"ბიოლოგია,11:00,11:35",
						"არჩევითი,11:40,12:15",
						"ისტორია,12:20,12:55",
					],
					[
						"გეოგრაფია,9:00,9:35",
						"ქართული,9:40,10:15",
						"ქიმია,10:40,11:15",
						"რუსული,11:15,11:35",
						"მათემატიკა,11:40,12:15",
						"ეკონომიკა,12:20,12:55",
						"საგზაო,13:00,13:35",
					],
					[
						"გეოგრაფია,9:00,9:35",
						"მათემატიკა,9:40,10:15",
						"ქართული,10:20,10:55",
						"ბიოლოგია,11:00,11:35",
						"ფიზიკა,11:40,12:15",
						"ისტორია,12:20,12:55",
					],
					[
						"მათემატიკა,9:00,9:35",
						"გეოგრაფია,9:40,10:15",
						"ქიმია,10:20,10:55",
						"ქართული,11:00,11:35",
						"ინგლისური,11:40,12:15",
						"საგზაო,12:20,12:55",
						"რუსული,13:00,13:35",
					],
				],
			}),
	})
);

afterEach(cleanup);

it("Day page", () => {
	const { getByTestId, debug } = render(
		<DayViewPage match={{ params: { d: 0 } }} />
	);
	debug();
	// container.debug();
	// expect(container.textContent).toBe("ორშსამოთხხუთპარ");
});

it("Day table", () => {
	const { debug } = render(<DayTable day={0} today={3} />);

	debug();
});
