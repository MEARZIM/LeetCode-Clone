
export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	// img?: string;
};

export type TestCase = {
	Input: [];
	Output: [];
}

// local problem data
export type Problem = {
	_id: string;
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	category: string;
	difficulty: string;
	starterCode: string;
	testCase: TestCase;
};

export type ProblemList = {
	_id: string;
	like: boolean,
	dislike: boolean,
	favorite: boolean,
	solved: boolean,
	solvedAnswer?: string
}

export type Users = {
	_id: any;
	username: string;
	email: string;
	totalLikes: Number,
	totalDisLikes: Number ,
	totalSolved: Number ,
	problemList: ProblemList[],
}