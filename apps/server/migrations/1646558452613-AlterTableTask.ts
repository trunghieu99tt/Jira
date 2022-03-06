import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTask1646558452613 implements MigrationInterface {
  name = 'AlterTableTask1646558452613';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`short_summary\` \`summary\` text NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` CHANGE \`summary\` \`short_summary\` text NOT NULL
        `);
  }
}
