const App = {
	pages: {
		day: {
			navbar: {
				buttons: weekdays
			},
			classes: {
				listOf: {
					class: {
						heading: {
							title: className,
							timers: [
								classStart,
								"class complete progress bar",
								classEnd
							]
						},
						details: {
							notes: [
								"teacher: " + classTeacher,
								"time left: " + classEnd - currentTime
							],
							homework: {
								listOf: {
									note: {
										main: content,
										interactions: {
											if: {
												author: {
													vote: ['up', 'down'],
													modify: ['delete', 'edit']
												},
												viewer: {
													vote: ['up', 'down']
												}
											}
										},
										author: [
											authorName,
											authorPhoto
										]
									}
								}
							}
						}
					}
				}
			}
		},
		week: {

		},
		settings: {

		}
	},
	navbar: {
		buttons: [
			"day",
			"week",
			"settings"
		]
	}
}