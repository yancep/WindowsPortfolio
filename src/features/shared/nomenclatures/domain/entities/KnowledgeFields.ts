export type KnowledgeGroupItem = {
  url: string;
  name: string;
  subgroups: string;
  code: string;
};

export type KnowledgeFieldItem = {
  id: string;
  url: string;
  name: string;
  groupUrl: number;
  groupCode: string;
  groupName: string;
  subgroupUrl: number;
  subgroupName: string;
  subgroupCode: string;
  code: string;
};

export type KnowledgeSubgroupItem = {
  url: string;
  name: string;
  knowledgeFields: string;
  code: string;
  group: string;
};
