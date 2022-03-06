import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTask1646558505387 implements MigrationInterface {
  name = 'AlterTableTask1646558505387';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`description\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`description\` longtext NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`description\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`description\` text NOT NULL
        `);
  }
}
